import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { updateUser, getUserById } from "../services/usuarioService";
import { listReservationsByUser } from "../services/reservaService";
import { getRoomById } from "../services/salaService";
import "../styles/pages/perfil.css";

function Perfil() {
  const { user, setUser } = useContext(AuthContext);
  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [novaSenha, setNovaSenha] = useState("");
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNome(user?.nome || "");
    setEmail(user?.email || "");
  }, [user]);

  useEffect(() => {
    let mounted = true;
    async function fetchReservations() {
      if (!user || !user.id) return;
      setLoading(true);
      try {
        const data = await listReservationsByUser(user.id);
        if (!mounted) return;

        // para cada reserva, buscar dados da sala para mostrar nome
        const detailed = await Promise.all(
          (data || []).map(async (r) => {
            try {
              const sala = await getRoomById(r.salaId);
              return { ...r, sala };
            } catch {
              return r;
            }
          })
        );
        setReservas(detailed);
      } catch (err) {
        console.error("Erro ao carregar reservas:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchReservations();
    return () => (mounted = false);
  }, [user]);

  async function handleSave(e) {
    e.preventDefault();
    if (!user || !user.id) {
      alert("Usuário não encontrado");
      return;
    }

    const payload = { nome: nome.trim(), email: email.trim() };
    if (novaSenha && novaSenha.length >= 6) payload.senha = novaSenha;

    try {
      const updated = await updateUser(user.id, payload);
      // o retorno pode ser o usuário atualizado
      const newUser = updated || (await getUserById(user.id));
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setNovaSenha("");
      alert("Perfil atualizado com sucesso");
    } catch (err) {
      console.error(err);
      alert(err.message || "Erro ao atualizar perfil");
    }
  }

  return (
    <div className="perfil-container">
      <NavBar />
      <main className="perfil-main">
        <section className="profile-card">
          <h2>Meu Perfil</h2>
          <form onSubmit={handleSave}>
            <div className="profile-field">
              <label>Nome</label>
              <input value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="profile-field">
              <label>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div style={{ marginTop: "1rem" }}>
              <h3 style={{ margin: 0 }}>Alterar senha</h3>
              <p className="small">A senha deve ter ao menos 6 caracteres.</p>
            </div>
            <div className="profile-field">
              <label>Nova senha</label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
            </div>

            <div className="btn-group">
              <button className="btn-primary" type="submit">
                Salvar
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setNome(user?.nome || "");
                  setEmail(user?.email || "");
                  setNovaSenha("");
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>

        <aside className="reservations-panel">
          <h2>Minhas reservas</h2>
          {loading && <p className="small">Carregando reservas...</p>}
          {!loading && reservas.length === 0 && (
            <p className="empty">Você não tem reservas cadastradas.</p>
          )}
          <div>
            {reservas.map((r) => (
              <div key={r.id} className="reservation-item">
                <div className="reservation-title">
                  {r.sala?.nome || `Sala: ${r.salaId}`}
                </div>
                <div className="small">
                  {r.dataReserva} • {r.horarioInicio} - {r.horarioFim}
                </div>
                <div className="small">Status: {r.status}</div>
              </div>
            ))}
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}

export default Perfil;
