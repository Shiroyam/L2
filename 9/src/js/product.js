const listHTML = (data) => `
<div id="${data.id}" class="product-list">
 <div class="product-name">${data.name}</div> 
 <div class="product-calories">${data.calories}</div> 
</div>`;

export const Product = () => {
  const showList = (data) => {
    const { products, listElement } = data;

    const list = document.querySelector(listElement)

    let html = "";
    let id;

    products.forEach((product) => {
      html += listHTML(product);
      id = product.id;
    });

    list.innerHTML = html;
  };

  const filter = (config, search) => {
    config.forEach((value) => {
      let html = "";

      value.products
        .filter((product) => {
          return product.name
            .toLowerCase()
            .includes(search.value.toLowerCase());
        })
        .map((product) => {
          html += listHTML(product);
        });

      value.listElement.innerHTML = html;
    });
  };

  const removeAll = (config) => {
    config.forEach((value) => {
      const element = document.querySelector(value.caloriesElement)

      value.products = [];
      value.totalCalories = 0;
      element.innerText = 0;
    });

    config.forEach((value) => {
      showList(value);
    });
  };

  return { showList, removeAll, filter };
};
