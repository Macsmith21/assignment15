const showCrafts = async () => {
    try {
        let response = await fetch("/api/crafts");
        let crafts = await response.json();
        let craftList = document.getElementById("craft-list");

        crafts.forEach((craft) => {
            let craftElement = document.createElement("div");
            craftElement.className = "craft";
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

// Handle the submission of the Add Item Form
document.getElementById('add-item-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Construct FormData object to include files for image upload
    let formData = new FormData(e.target);

    try {
        let response = await fetch('/api/crafts', {
            method: 'POST',
            body: formData // Assuming your server can handle FormData for file upload
        });

        if (response.ok) {
            console.log('Craft added successfully');
            document.getElementById('addItemModal').style.display = 'none';
            // Optionally, refresh the list of crafts
            showCrafts();
        } else {
            console.error('Failed to add craft');
        }
    } catch (error) {
        console.error('Error adding craft:', error);
    }
});


window.onload = showCrafts;
