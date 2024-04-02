const getRecipes = async () => {
    try {
      return (await fetch("api/recipes/")).json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const showRecipes = async () => {
    let recipes = await getRecipes();

    const columns = [
      document.getElementById("column-1"),
      document.getElementById("column-2"),
      document.getElementById("column-3"),
      document.getElementById("column-4"),
    ];

    columns.forEach(column => column.innerHTML = "");
  
    recipes.forEach((recipe, index) => {
      const section = document.createElement("section");
      section.classList.add("recipe");
  
      const a = document.createElement("a");
      a.href = "#";
      section.append(a);
      
      const img = document.createElement("img");
      img.src = "/images/"+recipe.img;
      a.append(img);
  
      a.onclick = (e) => {
        e.preventDefault();
        displayDetails(recipe);
      };
  

      const columnIndex = index % columns.length;
      columns[columnIndex].append(section);
    });
  };
  
  
  const displayDetails = (recipe) => {
    openDialog("recipe-details");
    const recipeDetails = document.getElementById("recipe-details");
    recipeDetails.innerHTML = "";
    recipeDetails.classList.remove("hidden");
  
    const h3 = document.createElement("h3");
    h3.innerHTML = recipe.name;
    recipeDetails.append(h3);
  
    const p = document.createElement("p");
    recipeDetails.append(p);
    p.innerHTML = recipe.description;
  
    const ul = document.createElement("ul");
    recipeDetails.append(ul);
    console.log(recipe.ingredients);
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      ul.append(li);
      li.innerHTML = ingredient;
    });
  
    const spoon = document.createElement("section");
    spoon.classList.add("spoon");
    recipeDetails.append(spoon);
  };
  
  const addRecipe = async (e) => {
    e.preventDefault();
    const form = document.getElementById("add-recipe-form");
    const formData = new FormData(form);
    let response;
    formData.append("ingredients", getIngredients());
  
    console.log(...formData);
  
    response = await fetch("/api/recipes", {
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
    const inputs = document.querySelectorAll("#ingredient-boxes input");
    let ingredients = [];
  
    inputs.forEach((input) => {
      ingredients.push(input.value);
    });
  
    return ingredients;
  };
  
  const resetForm = () => {
    const form = document.getElementById("add-recipe-form");
    form.reset();
    document.getElementById("ingredient-boxes").innerHTML = "";
    document.getElementById("img-prev").src = "";
  };
  
  const showRecipeForm = (e) => {
    e.preventDefault();
    openDialog("add-recipe-form");
    resetForm();
  };
  
  const addIngredient = (e) => {
    e.preventDefault();
    const section = document.getElementById("ingredient-boxes");
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
  showRecipes();
  document.getElementById("add-recipe-form").onsubmit = addRecipe;
  document.getElementById("add-link").onclick = showRecipeForm;
  document.getElementById("add-ingredient").onclick = addIngredient;
  
  document.getElementById("img").onchange = (e) => {
    if (!e.target.files.length) {
      document.getElementById("img-prev").src = "";
      return;
    }
    document.getElementById("img-prev").src = URL.createObjectURL(
      e.target.files.item(0)
    );
  };