/*
  shop_list = array com os itens
  isEditing = boolean, verificar na hora de salvar o item

  item = { id: number, name: string }
*/
var shop_list = [];
var isEditing = false;
var globalId = 0;

var addInput = document.querySelector("#add-input");
var addButton = document.querySelector("#add-button");
var shopListContainer = document.querySelector(".items-list");

addButton.addEventListener("click", () => {
  addItem(addInput.value);
  renderAllItems();
  addEvents();
});

function addItem(name) {
  // Adiciona o item na lista de itens global
  var item = {
    id: globalId,
    name,
  };
  globalId += 1;

  shop_list = [...shop_list, item];
}

function removeItem(idToRemove) {
  shop_list = shop_list.filter((list_item) => list_item.id !== idToRemove);
}

function addEvents() {
  var deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((deleteItemButton) => {
    deleteItemButton.addEventListener("click", () => {
      const itemToDelete = deleteItemButton.dataset.id;
      console.log(itemToDelete);
      removeItem(itemToDelete);
      renderAllItems();
    });
  });
}

function renderAllItems() {
  // Zerar os itens na tela
  shopListContainer.innerHTML = "";
  // Renderizar todos os itens na tela
  shop_list.forEach((list_item) => {
    renderItem(list_item);
  });
}

function renderItem(item) {
  // Criando o li e adicionando as propriedades
  var li = document.createElement("li");
  li.classList.add("shop-item");
  li.id = item.id;

  // Adicionando conteúdo
  var itemContent = `
    ${item.name}
    <div class="item-actions">
      <img
        class="icon edit"
        data-id=${item.id}
        src="assets/icons/shop_list/edit.svg"
        alt="Editar"
      />
      <img
        class="icon delete"
        data-id=${item.id}
        src="assets/icons/shop_list/trash.svg"
        alt="Deletar"
      />
    </div>
  `;
  li.innerHTML = itemContent;

  // Adiciona o item no container
  shopListContainer.appendChild(li);
}
