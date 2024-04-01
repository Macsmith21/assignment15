

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
// Show the Add Item Modal
document.getElementById('Add-button').addEventListener('click', () => {
    document.getElementById('addItemModal').style.display = 'block';
});

// Close the Add Item Modal
document.querySelector('.close-add-item').addEventListener('click', () => {
    document.getElementById('addItemModal').style.display = 'none';
});

document.getElementById('add-item-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    try {
        let response = await fetch('/api/crafts', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const newCraft = await response.json(); // Get the new craft data from the response

            // Now, append the new craft to the DOM
            appendCraftToDOM(newCraft);

            console.log('Craft added successfully');
            document.getElementById('addItemModal').style.display = 'none';
        } else {
            console.error('Failed to add craft');
        }
    } catch (error) {
        console.error('Error adding craft:', error);
    }
});
function appendCraftToDOM(craft) {
    let craftList = document.getElementById("craft-list");
    let craftElement = document.createElement("div");
    craftElement.className = "w3-col l3 m6 w3-margin-bottom";

    // Assume the image is stored in a 'public/uploads' directory accessible by your static server
    let imagePath = `/uploads/${craft.image}`;

    craftElement.innerHTML = `
        <div class="craft-image">
            <img src="${imagePath}" alt="${craft.name}">
        </div>
    `;

    // Append the new element to the craft list
    craftList.appendChild(craftElement);

    // Optionally, you can also add the click event listener to show the craft modal
    craftElement.querySelector('.craft-image img').addEventListener('click', () => showCraftModal(craft));
}


window.onload = showCrafts;
