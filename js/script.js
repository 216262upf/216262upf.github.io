// Dark Mode Toggle
function initDarkMode() {
  const darkModeButton = document.getElementById('dark-mode-btn');
  const htmlElement = document.documentElement;

  // Recuperar preferência salva
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    htmlElement.classList.add('dark-mode');
    darkModeButton.textContent = '☀️ Claro';
  }

  darkModeButton.addEventListener('click', () => {
    htmlElement.classList.toggle('dark-mode');
    const isNowDark = htmlElement.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isNowDark);
    darkModeButton.textContent = isNowDark ? '☀️ Claro' : '🌙 Escuro';
  });
}

// Accessibility - Font Size Control
function initAccessibility() {
  const increaseFontBtn = document.getElementById('increase-font-btn');
  const decreaseFontBtn = document.getElementById('decrease-font-btn');
  const htmlElement = document.documentElement;

  // Recuperar tamanho salvo
  const savedFontSize = localStorage.getItem('fontSize') || '16';
  htmlElement.style.fontSize = savedFontSize + 'px';

  increaseFontBtn.addEventListener('click', () => {
    let currentSize = parseInt(window.getComputedStyle(document.documentElement).fontSize);
    if (currentSize < 24) {
      currentSize += 2;
      htmlElement.style.fontSize = currentSize + 'px';
      localStorage.setItem('fontSize', currentSize);
    }
  });

  decreaseFontBtn.addEventListener('click', () => {
    let currentSize = parseInt(window.getComputedStyle(document.documentElement).fontSize);
    if (currentSize > 12) {
      currentSize -= 2;
      htmlElement.style.fontSize = currentSize + 'px';
      localStorage.setItem('fontSize', currentSize);
    }
  });
}

// Form Validation
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const phoneField = document.getElementById('phone');
  const messageField = document.getElementById('message');

  function validateField(field) {
    const errorElement = field.nextElementSibling;
    let isValid = true;
    let errorMessage = '';

    if (field.id === 'name') {
      if (field.value.trim().length < 3) {
        isValid = false;
        errorMessage = 'Nome deve ter pelo menos 3 caracteres';
      }
    }

    if (field.id === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        errorMessage = 'Email inválido';
      }
    }

    if (field.id === 'phone') {
      const phoneRegex = /^(\d{2})\s?9?\d{4}-?\d{4}$/;
      if (field.value.trim() && !phoneRegex.test(field.value)) {
        isValid = false;
        errorMessage = 'Telefone inválido (formato: XX 9XXXX-XXXX)';
      }
    }

    if (field.id === 'message') {
      if (field.value.trim().length < 10) {
        isValid = false;
        errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
      }
    }

    if (errorElement && errorElement.classList.contains('error')) {
      if (isValid) {
        errorElement.textContent = '';
        field.style.borderColor = '';
      } else {
        errorElement.textContent = errorMessage;
        field.style.borderColor = '#e74c3c';
      }
    }

    return isValid;
  }

  // Validação em tempo real
  [nameField, emailField, phoneField, messageField].forEach(field => {
    if (field) {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.value.trim()) {
          validateField(field);
        }
      });
    }
  });

  // Submissão do formulário
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    [nameField, emailField, phoneField, messageField].forEach(field => {
      if (field && !validateField(field)) {
        allValid = false;
      }
    });

    if (allValid) {
      alert('Formulário enviado com sucesso! Obrigado por entrar em contato.');
      contactForm.reset();
      // Limpar estilos de validação
      [nameField, emailField, phoneField, messageField].forEach(field => {
        if (field) field.style.borderColor = '';
      });
    } else {
      alert('Por favor, corrija os erros no formulário.');
    }
  });
}

// Inicializar tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initAccessibility();
  initFormValidation();
});
