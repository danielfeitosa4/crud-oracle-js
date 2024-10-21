async function fetchUsers() {
    const response = await fetch('/api/users');
    const users = await response.json();
    let userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(user => {
        userList.innerHTML += `<div>
            <span>${user.name} - ${user.email}</span>
            <button onclick="deleteUser(${user.id})">Deletar</button>
            <button onclick="updateUser(${user.id})">Editar</button>
        </div>`;
    });
}

async function createUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    });

    fetchUsers();  // Atualiza a lista após criar o usuário
}

async function deleteUser(id) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchUsers();  // Atualiza a lista após deletar o usuário
}

async function updateUser(id) {
    const name = prompt("Novo nome:");
    const email = prompt("Novo email:");

    await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    });

    fetchUsers();  // Atualiza a lista após editar o usuário
}

document.addEventListener('DOMContentLoaded', fetchUsers);  // Carrega os usuários na inicialização
