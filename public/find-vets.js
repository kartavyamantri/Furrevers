document.getElementById('vetLocationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const location = document.getElementById('vetLocationInput').value;
    searchVets(location);
});

function searchVets(location) {
    const vets = [
        { name: "Happy Tails Vet Clinic", address: "1234 Elm St, Springfield", rating: 4.5 },
        { name: "Healthy Pets Vet Center", address: "5678 Oak St, Shelbyville", rating: 4.7 },
        { name: "Caring Paws Veterinary", address: "9101 Pine St, Capital City", rating: 4.6 }
    ];

    const vetList = document.getElementById('vetList');
    vetList.innerHTML = '';

    vets.forEach(vet => {
        const vetDiv = document.createElement('div');
        vetDiv.className = 'vet';
        vetDiv.innerHTML = `
            <h3>${vet.name}</h3>
            <p>Address: ${vet.address}</p>
            <p>Rating: ${vet.rating} ⭐</p>
        `;
        vetList.appendChild(vetDiv);
    });
}
