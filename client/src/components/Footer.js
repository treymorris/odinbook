import '../App.css';

const handleSubmit = () => {
    window.location.href = '/'
}

function Footer() {
    return (
      <div className="navbar  bg-dark d-flex justify-content-center">
            <button
                className="btn nav-link btn-sm"
                type="button"
                onClick={handleSubmit}
                >OB
            </button>
      </div>
    );
}

export default Footer;