import './css/Login.css'

export default function Login() {
  const handleLogin = () => {
    const nomeInput = document.getElementById("username") as HTMLInputElement
    const senhaInput = document.getElementById("senha") as HTMLInputElement
    
    const nome = nomeInput?.value || ""
    const password = senhaInput?.value || ""
    const nomeVerdadeiro = localStorage.getItem("nome")
    const senhaVerdadeira = localStorage.getItem("senha")
    
    if (!nome) return alert("Coloque seu nome")
    if (!password) return alert("Coloque sua senha")
    if (nome !== nomeVerdadeiro) return alert("Nome incorreto")
    if (password !== senhaVerdadeira) return alert("Senha incorreta")
    
    alert("Login realizado com sucesso!")
    localStorage.setItem("isLogged", "true")
    window.location.href = "/home"
  }

  return (
    <div className="form-container">
      <p className="title">Login</p>
      <form className="form">
        <div className="input-group">
          <label htmlFor="username">Nome</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" id="senha" />
          <div className="forgot">
            <a href="#pagina_maneira_recuperar_login">
              Esqueceu a Senha? Clique aqui!
            </a>
          </div>
        </div>
        <a className='sign' onClick={handleLogin}>Login</a>
      </form>
      <p className="signup">
        Não tem uma conta?
        <a href="/cadastro"> Cadastre-se</a>
      </p>
    </div>
  )
}
