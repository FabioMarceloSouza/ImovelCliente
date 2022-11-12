export interface ResposnseApiCliente {
  id: number,
  name: string,
  email: string,
  cpfOuCnpj: string,
  active: boolean,
  imovels: Imovels[]
}


interface Imovels {
  id: number,
  tipoImovel: number,
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
}
