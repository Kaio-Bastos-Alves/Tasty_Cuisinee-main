import './css/Cadastro.css'
 
export default function Cadastro() {
  const handleCadastro = () => {
    const nome = (document.getElementById("nome") as HTMLInputElement)?.value || ""
    const email = (document.getElementById("email") as HTMLInputElement)?.value || ""
    const data = (document.getElementById("Data_Nascimento") as HTMLInputElement)?.value || ""
    const usuario = (document.getElementById("username") as HTMLInputElement)?.value || ""
    const password = (document.getElementById("senha") as HTMLInputElement)?.value || ""
    const cpassword = (document.getElementById("Csenha") as HTMLInputElement)?.value || ""

    if (!nome) return alert("Preencha seu nome")
    if (!usuario) return alert("Preencha seu nome de usuário")
    if (!email) return alert("Preencha seu email")
    if (!data) return alert("Preencha sua data de nascimento")
    if (password.length < 8) return alert("A senha deve ter no mínimo 8 caracteres")
    if (!cpassword) return alert("Confirme sua senha")
    if (password !== cpassword) return alert("As senhas não coincidem")
    
    alert("Cadastro realizado com sucesso!")
    localStorage.setItem("usuário", usuario)
    localStorage.setItem("nome", nome)
    localStorage.setItem("email", email)
    localStorage.setItem("data", data)
    localStorage.setItem("senha", password)
    localStorage.setItem("isLogged", "true")
    window.location.href = "/home"
  }

  return (
    <div className="form-container">
      <p className="title">Cadastro</p>
      <form className="form">
        <div className="input-group">
          <label htmlFor="nome">Nome</label>
          <input type="text" name="nome" id="nome" />
        </div>
        <div className="input-group">
          <label htmlFor="username">Nome de Usuário</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type='email' name="email" id="email" />
        </div>
        <div className="input-group">
          <label htmlFor="Data_Nascimento">Data de Nascimento</label>
          <input type="date" name="Data_Nascimento" id="Data_Nascimento" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" id="senha" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Confirmar Senha</label>
          <input type="password" name="password" id="Csenha" />
        </div>
        <a className='sign' onClick={handleCadastro}>Cadastrar!</a>
      </form>
      <p className="signup">
        Já tem uma conta?
        <a href="/login"> Faça login!</a>
      </p>
    </div>
  )
}