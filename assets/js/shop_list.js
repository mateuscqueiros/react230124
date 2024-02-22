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
  addInput.value = "";
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

/**
 * Editar item no shopList
 * @param {*} idToEdit
 * @param {*} name
 */
function editItem(idToEdit, name) {
  var newItem = {
    id: idToEdit,
    name,
  };

  const otherItems = shopList.filter(
    (shopItem) => shopItem.id !== Number(idToEdit)
  );

  shopList = [...otherItems, newItem].sort((a, b) => a.id - b.id);
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

  // Selecionar todos os elementos com class .confirm-edit
  var confirmButtons = document.querySelectorAll(".confirm-edit");
  confirmButtons.forEach((confirmItemButton) => {
    // Adicionar o evento de coinfirmar a edição
    confirmItemButton.addEventListener("click", () => {
      const itemToConfirm = confirmItemButton.dataset.id;
      const itemInput = document.querySelector(`[id='${itemToConfirm}'] input`);
      editItem(Number(itemToConfirm), itemInput.value);
      endEditAction(itemToConfirm);
      renderAllItems();
    });
  });
}

function startEditAction(id) {
  // Selecionar os elementos
  const itemName = document.querySelector(`[id='${id}'] .item-name`);
  const itemInput = document.querySelector(`[id='${id}'] .edit-item-input`);
  const itemNormalActions = document.querySelector(
    `[id='${id}'] .item-actions .normal-actions`
  );
  const itemEditActions = document.querySelector(
    `[id='${id}'] .item-actions .edit-actions`
  );

  // Esconder e mostrar as ações, iniciando o editar
  itemName.classList.add("hidden");
  itemInput.classList.remove("hidden");
  itemNormalActions.classList.add("hidden");
  itemEditActions.classList.remove("hidden");

  // Achar item e colocar valor no input
  const itemToEdit = shopList.find((shopItem) => shopItem.id === Number(id));
  itemInput.value = itemToEdit.name;
}

function endEditAction(id) {
  // Selecionar os elementos
  const itemName = document.querySelector(`[id='${id}'] .item-name`);
  const itemInput = document.querySelector(`[id='${id}'] .edit-item-input`);
  const itemNormalActions = document.querySelector(
    `[id='${id}'] .item-actions .normal-actions`
  );
  const itemEditActions = document.querySelector(
    `[id='${id}'] .item-actions .edit-actions`
  );

  // Esconder e mostrar as ações, finalizando o editar
  itemName.classList.remove("hidden");
  itemInput.classList.add("hidden");
  itemNormalActions.classList.remove("hidden");
  itemEditActions.classList.add("hidden");

  // Zerar input de editar
  itemInput.value = "";
}

function renderAllItems() {
  const noItemsMessage = document.querySelector(".no-items-message");
  // Zerar os itens na tela
  shopListContainer.innerHTML = "";
  // Renderizar todos os itens na tela
  if (shopList.length > 0) {
    noItemsMessage.classList.add("hidden");
    shopList.forEach((listItem) => {
      renderItem(listItem);
    });
    addEvents();
  } else {
    noItemsMessage.classList.remove("hidden");
  }
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
      <input type="text" class="edit-item-input hidden" data-id=${item.id} />
    </div>
    <div class="item-actions">
      <div class="normal-actions">
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
      <div class="edit-actions hidden">
        <img
          class="icon confirm-edit"
          data-id=${item.id}
          src="assets/icons/shop_list/check.svg"
          alt="Salvar edição"
        />
      </div>
    </div>
  `;
  li.innerHTML = itemContent;

  // Adiciona o item no container
  shopListContainer.appendChild(li);
}

renderAllItems();
