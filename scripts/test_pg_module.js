const { pgGetAllProducts } = require('../src/lib/pg-products');

async function test() {
  try {
    const products = await pgGetAllProducts();
    console.log('Successfully fetched products from Neon DB directly via pg:');
    console.log('Total products:', products.length);
    products.forEach(p => console.log(`- [${p.id}] ${p.name} (${p.category})`));
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
