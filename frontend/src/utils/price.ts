

export const formatPrice = (value: number) => {
    const price = value / 100
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price)
}