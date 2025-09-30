export function formatCurrency(amount: number): string {
  // Intl.NumberFormat é um construtor nativo do JavaScript.
  // 'pt-BR' define o formato brasileiro (ponto como separador de milhar, vírgula para decimais).
  // O objeto de opções especifica que queremos formatar como moeda (currency) e qual é a moeda (BRL).
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}