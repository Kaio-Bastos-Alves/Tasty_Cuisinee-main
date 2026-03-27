import axios from 'axios'
import { useState, useEffect } from 'react'

export default function NewReceitas() {
  const [receitas, setReceitas] = useState(['Calabraza', 'Muçarela', 'Baiana'])

  useEffect(() => {
    axios.get("http://localhost:8080/usuario/findAll")
      .then(response => {
        console.log(response.data.data)
        setReceitas(response.data.data)
      })
  }, [])

  return (
    <div>
      <ul>
        {receitas.map((receita, index) => (
          <li key={index}>{receita}</li>
        ))}
      </ul>
    </div>
  )
}