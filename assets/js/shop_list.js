/*
  shopList = array com os itens
  isEditing = boolean, verificar na hora de salvar o item

  item = { id: number, name: string }
*/
var shopList = [];
var isEditing = false;
var globalId = 0;

var addInput = document.querySelector("#add-input");
var addButton = document.querySelector("#add-button");
var shopListContainer = document.querySelector(".items-list");

addButton.addEventListener("click", () => {
  addItem(addInput.value);
  renderAllItems();
});

function addItem(name) {
  // Adiciona o item na lista de itens global
  var item = {
    id: globalId,
    name,
  };
  globalId += 1;

  shopList = [...shopList, item];
}

function removeItem(idToRemove) {
  // Filtrando todos os itens que não tenham o id do item a ser removido
  shopList = shopList.filter((listItem) => listItem.id !== Number(idToRemove));
}

function addEvents() {
  // Selecionar todos os elementos com classe .delete
  var deleteButtons = document.querySelectorAll(".delete");
  // Percorrer o array de elementos
  deleteButtons.forEach((deleteItemButton) => {
    // Adicionar o evento de delete
    deleteItemButton.addEventListener("click", () => {
      const itemToDelete = deleteItemButton.dataset.id;
      removeItem(itemToDelete);
      renderAllItems();
    });
  });

  // Selecionar todos os elementos com classe .edit
  var editButtons = document.querySelectorAll(".edit");
  // Percorrer o array de elementos
  editButtons.forEach((editItemButton) => {
    // Adicionar o evento de edição
    editItemButton.addEventListener("click", () => {
      const itemToEdit = editItemButton.dataset.id;
      startEditAction(itemToEdit);
    });
  });
}

function startEditAction(id) {
  const itemName = document.querySelector(`[id='${id}'] .item-name`);
  const itemInput = document.querySelector(`[id='${id}'] .edit-item-input`);
  const itemActions = document.querySelector(`[id='${id}'] .item-actions`);

  itemName.classList.add("hidden");
  itemInput.classList.remove("hidden");
  itemActions.classList.add("hidden");
}

function renderAllItems() {
  // Zerar os itens na tela
  shopListContainer.innerHTML = "";
  // Renderizar todos os itens na tela
  shopList.forEach((listItem) => {
    renderItem(listItem);
  });
  addEvents();
}

function renderItem(item) {
  // Criando o li e adicionando as propriedades
  var li = document.createElement("li");
  li.classList.add("shop-item");
  li.id = item.id;

  // Adicionando conteúdo
  var itemContent = `
    <div>
      <span class="item-name">${item.name}</span>
      <input type="text" class="edit-item-input hidden" />
    </div>
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
