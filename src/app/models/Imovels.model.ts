import { Cliente } from "./cliente.model"

export interface Imovels {
  id: number,
  tipoImovel: number | string,
  valorImovel: number,
  dataPublicao: Date,
  descricao: string,
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  clienteId: number
  cliente: Cliente
}
