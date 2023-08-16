class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
          'cafe': { descricao: 'Café', valor: 3.00 },
          'chantily': { descricao: 'Chantily (extra do Café)', valor: 1.50 },
          'suco': { descricao: 'Suco Natural', valor: 6.20 },
          'sanduiche': { descricao: 'Sanduíche', valor: 6.50 },
          'queijo': { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
          'salgado': { descricao: 'Salgado', valor: 7.25 },  
          'combo1': { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
          'combo2': { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        };
      }
    calcularValorDaCompra(formaDePagamento, itens) {
        if (!['debito', 'credito', 'dinheiro'].includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
          }
      
          if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
          }
      
          let total = 0;
          let coffeeQuantity = 0;
          let sandwichQuantity = 0;
      
          for (const itemInfo of itens) {
            const [code, amount] = itemInfo.split(',');
            const item = this.cardapio[code];
      
            if (!item) {
              return 'Item inválido!';
            }
      
            if (code === 'cafe') {
              coffeeQuantity += parseInt(amount);
            } else if (code === 'sanduiche') {
              sandwichQuantity += parseInt(amount);
            } else if (code === 'chantily' &&  coffeeQuantity === 0) {
              return 'Item extra não pode ser pedido sem o principal';
            } else if (code === 'queijo' && sandwichQuantity === 0) {
              return 'Item extra não pode ser pedido sem o principal';
            }
    
            if (amount <= 0) {
                return "Quantidade inválida!";
                }
      
            total += item.valor * parseInt(amount);
          }
      
          if (formaDePagamento === 'dinheiro') {
            total *= 0.95; 
          } else if (formaDePagamento === 'credito') {
            total *= 1.03; 
          }
      
          return `R$ ${total.toFixed(2).replace('.', ',')}`;
        }
      }
      export { CaixaDaLanchonete}
      // Exemplos de uso
      const caixa = new CaixaDaLanchonete();
      //console.log(caixa.calcularValorDaCompra('debito', [ 'chantily,1'])); // Saída: "R$ 4,50"
      console.log(caixa.calcularValorDaCompra('dinheiro', ['combo1,1', 'cafe,5'])); // Saída: "R$ 15,96"
      