

/**
 * Agrupa um array de vendas por mês.
 *
 * @param sales
 *   Array de objetos que contém:
 *   - `totalAmount`: valor da venda
 *   - `createdAt`: data da venda
 * @returns
 *   Um array de 12 pontos ({ name, total }), onde:
 *   - `name` é a sigla do mês ("Jan", "Feb", …)
 *   - `total` é a soma dos `totalAmount` daquele mês
 *
 * @example
 * const vendas = [
 *   { totalAmount: 100, createdAt: new Date(2023, 0, 5) },
 *   { totalAmount: 200, createdAt: new Date(2023, 5, 10) }
 * ];
 * // retorna [{ name: "Jan", total: 100 }, …, { name: "Jun", total: 200 }, …]
 * const chart = groupSalesByMonth(vendas);
 */
export function groupSalesByMonth(
    sales: Array<{ totalAmount: number; createdAt: Date }>
  ): Array<{ name: string; total: number }> {
    const buckets = Array(12).fill(0);
    sales.forEach(({ totalAmount, createdAt }) => {
      buckets[createdAt.getMonth()] += totalAmount;
    });
  
    return buckets.map((total, idx) => ({
      name: new Date(2000, idx).toLocaleString("default", { month: "short" }),
      total,
    }));
  }
  