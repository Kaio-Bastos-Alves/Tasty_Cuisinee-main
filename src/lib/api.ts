/**
 * API Configuration
 * Centralized API endpoints and utilities for communicating with the Tasty Cuisine backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Endpoints
export const API_ENDPOINTS = {
  // Receitas
  RECEITAS: `${API_BASE_URL}/receita`,
  RECEITA_BY_ID: (id: string | number) => `${API_BASE_URL}/receita/${id}`,
  
  // Usuários
  USUARIOS: `${API_BASE_URL}/usuario`,
  USUARIO_BY_ID: (id: string | number) => `${API_BASE_URL}/usuario/${id}`,
  
  // Chefes
  CHEFES: `${API_BASE_URL}/chefe`,
  CHEFE_BY_ID: (id: string | number) => `${API_BASE_URL}/chefe/${id}`,
  
  // Favoritos
  FAVORITOS: `${API_BASE_URL}/favorito`,
  FAVORITO_BY_ID: (id: string | number) => `${API_BASE_URL}/favorito/${id}`,
  
  // Avaliações
  AVALIACOES: `${API_BASE_URL}/avaliacao`,
  AVALIACAO_BY_ID: (id: string | number) => `${API_BASE_URL}/avaliacao/${id}`,
  
  // Comentários
  COMENTARIOS: `${API_BASE_URL}/comentario`,
  COMENTARIO_BY_ID: (id: string | number) => `${API_BASE_URL}/comentario/${id}`,
  
  // Acesso (CRUD de acessos)
  ACESSOS: `${API_BASE_URL}/acesso`,
  ACESSO_BY_ID: (id: string | number) => `${API_BASE_URL}/acesso/${id}`,
  
  // Categorias
  CATEGORIAS: `${API_BASE_URL}/categoria`,
  CATEGORIA_BY_ID: (id: string | number) => `${API_BASE_URL}/categoria/${id}`,
}

// Utility function to make API calls with error handling
export async function apiCall<T>(
  url: string,
  options?: RequestInit
): Promise<{ data?: T; error?: string; status: number }> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.text()
      return { error, status: response.status }
    }

    const data = await response.json()
    return { data, status: response.status }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 0,
    }
  }
}

// Receitas API
export const receitasAPI = {
  getAll: () => apiCall(API_ENDPOINTS.RECEITAS),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.RECEITA_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.RECEITAS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.RECEITA_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.RECEITA_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Usuários API
export const usuariosAPI = {
  getAll: () => apiCall(API_ENDPOINTS.USUARIOS),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.USUARIO_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.USUARIOS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.USUARIO_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.USUARIO_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Chefes API
export const chefesAPI = {
  getAll: () => apiCall(API_ENDPOINTS.CHEFES),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.CHEFE_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.CHEFES, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.CHEFE_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.CHEFE_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Favoritos API
export const favoritosAPI = {
  getAll: () => apiCall(API_ENDPOINTS.FAVORITOS),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.FAVORITO_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.FAVORITOS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.FAVORITO_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.FAVORITO_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Avaliações API
export const avaliacoesAPI = {
  getAll: () => apiCall(API_ENDPOINTS.AVALIACOES),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.AVALIACAO_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.AVALIACOES, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.AVALIACAO_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.AVALIACAO_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Comentários API
export const comentariosAPI = {
  getAll: () => apiCall(API_ENDPOINTS.COMENTARIOS),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.COMENTARIO_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.COMENTARIOS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.COMENTARIO_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.COMENTARIO_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Acessos API
export const acessosAPI = {
  getAll: () => apiCall(API_ENDPOINTS.ACESSOS),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.ACESSO_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.ACESSOS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.ACESSO_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.ACESSO_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Categorias API
export const categoriasAPI = {
  getAll: () => apiCall(API_ENDPOINTS.CATEGORIAS),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.CATEGORIA_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.CATEGORIAS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.CATEGORIA_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.CATEGORIA_BY_ID(id), {
      method: 'DELETE',
    }),
}
