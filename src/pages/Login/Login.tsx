import Style from './Login.module.css'
import b2bitLogo from '../../assets/b2bitLogo.png'
import { useAuth } from '../../context/AuthProvider/useAuth'
import { useNavigate, Navigate } from 'react-router-dom'
import { useState, ChangeEvent, FormEvent } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const modifyEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const modifyPassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const sendData = async (e: FormEvent) => {
    e.preventDefault()

    if (email === '' || password === '') {
      setError('Please fill in all required fields')
      return
    }

    try {
      await auth.authenticate(email, password)
      navigate('/profile')
    } catch (error) {
      setError('Invalid email or password')
    }
  };

  if (auth.email) {
    return <Navigate to="/profile" />
  }

  return (
    <div className={Style.container}>
      <main>
        <h1><img src={b2bitLogo} alt="Logo da B2bit" /></h1>

        <form onSubmit={sendData}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <fieldset>
            <label>E-mail</label>
            <input type="email" placeholder='@gmail.com' value={email} onChange={modifyEmail} />
          </fieldset>
          <fieldset>
            <label>Password</label>
            <input type="password" placeholder='****************' value={password} onChange={modifyPassword} />
          </fieldset>
          <button type="submit">Sign in</button>
        </form>
      </main>
    </div>
  )
}

export default Login