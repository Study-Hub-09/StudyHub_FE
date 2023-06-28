import Swal from 'sweetalert2';

const Alert = (icon, text) => {
  Swal.fire({
    icon: icon,
    iconColor: 'var(--color-dark-green)',
    width: 400,
    text: text,
    confirmButtonColor: 'var(--color-dark-green)',
    confirmButtonText: '확인',
  });
};

export { Alert };
