

const handleSubmit = () => {
    window.location.href = '/userHome'
}

function Footer() {
    return (
      <div>
        <button
            className="btn bg-transparent nav-link mx-auto "
            type="button"
            onClick={handleSubmit}
            >OB
        </button>
      </div>
    );
}

export default Footer;