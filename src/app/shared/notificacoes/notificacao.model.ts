export interface Notificacao {
  id: number;
  descricao: string;
  dtCriacao: string;
  dtLeitura: string | null;
  lido: boolean;
}
