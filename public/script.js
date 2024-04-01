const getRecipes = async () => {
    try {
      return (await fetch("api/crafts/")).json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const showCrafts = async () => {
    try {
        let response = await fetch("/api/crafts");
        let crafts = await response.json();
        let craftList = document.getElementById("craft-list");

        crafts.forEach((craft) => {
            let craftElement = document.createElement("div");
            craftElement.className = "w3-col l3 m6 w3-margin-bottom";
            craftElement.innerHTML = `
                <div class="craft-image">
                    <img src="/images/${craft.image}" alt="${craft.name}">
                </div>
            `;
            craftList.appendChild(craftElement);

      
            craftElement.querySelector('.craft-image img').addEventListener('click', () => showCraftModal(craft));
        });
    } catch (error) {
        console.error("Failed to fetch crafts:", error);
    }
};

const showCraftModal = (craft) => {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <span class="close">&times;</span>
        <h2>${craft.name}</h2>
        <img src="/images/${craft.image}" alt="${craft.name}" style="width:10%;">
        <p>${craft.description}</p>
        <h3>Supplies:</h3>
        <ul>
            ${craft.supplies.map(supply => `<li>${supply}</li>`).join('')}
        </ul>
    `;
    document.getElementById('myModal').style.display = 'block';

    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('myModal').style.display = 'none';
    });
};
  
  const displayDetails = (craft) => {
  };
  
  const addRecipe = async (e) => {
    e.preventDefault();
    const form = document.getElementById("add-craft-form");
    const formData = new FormData(form);
    let response;
    formData.append("ingredients", getIngredients());
  
    console.log(...formData);
  
    response = await fetch("/api/crafts", {
      method: "POST",
      body: formData,
    });
  
    //successfully got data from server
    if (response.status != 200) {
      console.log("Error posting data");
    }
  
    await response.json();
    resetForm();
    document.getElementById("dialog").style.display = "none";
    showRecipes();
  };
  
  const getIngredients = () => {
    const inputs = document.querySelectorAll("#supply-boxes input");
    let ingredients = [];
  
    inputs.forEach((input) => {
      ingredients.push(input.value);
    });
  
    return ingredients;
  };
  
  const resetForm = () => {
    const form = document.getElementById("add-craft-form");
    form.reset();
    document.getElementById("supplys-boxes").innerHTML = "";
    document.getElementById("img-prev").src = "";
  };
  
  const showRecipeForm = (e) => {
    e.preventDefault();
    openDialog("add-craft-form");
    resetForm();
  };
  
  const addIngredient = (e) => {
    e.preventDefault();
    const section = document.getElementById("supply-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);
  };
  
  const openDialog = (id) => {
    document.getElementById("dialog").style.display = "block";
    document.querySelectorAll("#dialog-details > *").forEach((item) => {
      item.classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
  };
  
  //initial code
  window.onload = showCrafts;
  document.getElementById("add-craft-form").onsubmit = addRecipe;
  document.getElementById("add-supply").onclick = addIngredient;
  
  document.getElementById("img").onchange = (e) => {
    if (!e.target.files.length) {
      document.getElementById("img-prev").src = "";
      return;
    }
    document.getElementById("img-prev").src = URL.createObjectURL(
      e.target.files.item(0)
    );
  };