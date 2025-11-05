// component them nguoi dung moi voi modal form
function AddUser({ onAdd }) {
    const [showModal, setShowModal] = React.useState(false);
    const [user, setUser] = React.useState({
        name: "",
        username: "",
        email: "",
        address: { street: "", suite: "", city: "" },
        phone: "",
        website: ""
    });

    // xu ly thay doi cac truong input
    const handleChange = (e) => {
        const { id, value } = e.target;
        
        if (["street", "suite", "city"].includes(id)) {
            // xu ly nested state cho address
            setUser({ 
                ...user, 
                address: { ...user.address, [id]: value } 
            });
        } else {
            setUser({ 
                ...user, 
                [id]: value 
            });
        }
    };

    // xu ly khi nhan nut them
    const handleAdd = () => {
        if (user.name === "" || user.username === "") {
            alert("Vui lòng nhập Name và Username!");
            return;
        }

        onAdd(user);
        resetForm();
    };

    // reset form ve trang thai ban dau
    const resetForm = () => {
        setUser({ 
            name: "", 
            username: "", 
            email: "", 
            address: { street: "", suite: "", city: "" }, 
            phone: "", 
            website: "" 
        });
        setShowModal(false);
    };

    return (
        <div className="card">
            <h2 className="card-title">➕ Thêm người dùng</h2>
            
            <button 
                className="btn btn-primary" 
                onClick={() => setShowModal(true)}
            >
                Thêm người dùng mới
            </button>

            {/* modal hien thi khi showModal = true */}
            {showModal && (
                <div className="modal-overlay" onClick={resetForm}>
                    {/* ngan chan dong modal khi click vao noi dung ben trong */}
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Thêm người dùng mới</h3>
                            <button 
                                className="modal-close" 
                                onClick={resetForm}
                                aria-label="Đóng"
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="add-user-form">
                                <div className="form-group">
                                    <label htmlFor="name">Họ và tên *</label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={user.name}
                                        onChange={handleChange}
                                        placeholder="Nguyễn Văn A"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username">Tên đăng nhập *</label>
                                    <input
                                        id="username"
                                        type="text"
                                        value={user.username}
                                        onChange={handleChange}
                                        placeholder="nguyenvana"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="street">Địa chỉ (Street)</label>
                                    <input
                                        id="street"
                                        type="text"
                                        value={user.address.street}
                                        onChange={handleChange}
                                        placeholder="123 Đường ABC"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="suite">Căn hộ/Phòng (Suite)</label>
                                    <input
                                        id="suite"
                                        type="text"
                                        value={user.address.suite}
                                        onChange={handleChange}
                                        placeholder="Apt. 101"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="city">Thành phố (City)</label>
                                    <input
                                        id="city"
                                        type="text"
                                        value={user.address.city}
                                        onChange={handleChange}
                                        placeholder="Hà Nội"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Số điện thoại</label>
                                    <input
                                        id="phone"
                                        type="text"
                                        value={user.phone}
                                        onChange={handleChange}
                                        placeholder="0123456789"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="website">Website</label>
                                    <input
                                        id="website"
                                        type="text"
                                        value={user.website}
                                        onChange={handleChange}
                                        placeholder="example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button 
                                type="button"
                                className="btn btn-cancel" 
                                onClick={resetForm}
                            >
                                Hủy
                            </button>
                            <button 
                                type="button"
                                className="btn btn-primary" 
                                onClick={handleAdd}
                            >
                                Xác nhận thêm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
