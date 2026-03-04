import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ItemList() {
  const [usuarios, setUsuarios] = useState<any[]>([])

  useEffect(() => {
    axios.get("http://localhost:8080/usuario/findAll")
      .then(response => {
        console.log(response.data)
        setUsuarios(response.data)
      })
  }, [])

  return (
    <div>
      <ul>
        {usuarios.map((usuario, index) => (
          <li key={index}>{usuario?.nome_completo}</li>
        ))}
      </ul>
    </div>
  )
}