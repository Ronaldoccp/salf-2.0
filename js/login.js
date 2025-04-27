document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o objeto API está disponível
    if (typeof API === 'undefined' || !API.auth || !API.auth.login) {
        console.error('API de autenticação não está disponível. Verifique se o arquivo api.js foi carregado corretamente.');
        document.getElementById('error-message').textContent = 
            'Erro de carregamento da API. Por favor, recarregue a página ou contate o suporte.';
        document.getElementById('error-message').classList.remove('hidden');
        return;
    }

    console.log('API verificada e disponível:', API);

    // Verificar se o usuário já está logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        // Redirecionar para o dashboard
        window.location.href = 'dashboard.html';
        return;
    }

    // Referências aos elementos do DOM
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessageDiv = document.getElementById('error-message');

    // Função para exibir mensagens de erro
    function showError(message) {
        errorMessageDiv.textContent = message;
        errorMessageDiv.classList.remove('hidden');
    }

    // Função para limpar mensagens de erro
    function clearError() {
        errorMessageDiv.textContent = '';
        errorMessageDiv.classList.add('hidden');
    }

    // Adicionar listener para preencher automaticamente ao clicar nos exemplos
    document.querySelectorAll('.bg-gray-50').forEach(element => {
        element.addEventListener('click', function() {
            const text = this.innerText.trim();
            const lines = text.split('\n');
            if (lines.length >= 2) {
                emailInput.value = lines[0].trim();
                passwordInput.value = lines[1].trim();
            }
        });
    });

    // Adicionar listener ao formulário
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearError();
        
        const email = emailInput.value.trim();
        const senha = passwordInput.value.trim();
        
        if (!email) {
            showError('Por favor, informe seu email');
            emailInput.focus();
            return;
        }
        
        if (!senha) {
            showError('Por favor, informe sua senha');
            passwordInput.focus();
            return;
        }
        
        // Desabilitar botão durante o login
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Entrando...';
        
        try {
            // Tentar fazer login usando a API
            await API.auth.login(email, senha);
            
            // Redirecionar para a página principal
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Erro detalhado:', error);
            showError(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
            
            // Reativar o botão
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}); 