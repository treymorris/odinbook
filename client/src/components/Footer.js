import '../App.css';

const handleSubmit = () => {
    window.location.href = '/'
}

function Footer() {
    return (
      <div className="d-grid col-1 mx-auto mb-3">
            <button
                className="btn btn-link btn-sm"
                type="button"
                onClick={handleSubmit}
                >OB
            </button>
      </div>
    );
}

export default Footer;