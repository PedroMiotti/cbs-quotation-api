export const formatToBrlCurrency = (value: number = 0) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}