// component hien thi danh sach nguoi dung voi chuc nang loc, sua (modal), xoa
function ResultTable({ keyword, user, onAdded }) {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [editingUser, setEditingUser] = React.useState(null);

    // tai du lieu tu api khi component mount
    React.useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Loi khi tai du lieu:", error);
                setLoading(false);
            });
    }, []);

    // lang nghe prop user de them vao danh sach
    React.useEffect(() => {
        if (user) {
            setUsers((prev) => [
                { ...user, id: prev.length > 0 ? Math.max(...prev.map(u => u.id)) + 1 : 1 },
                ...prev
            ]);
            onAdded();
        }
    }, [user]);

    // loc danh sach theo keyword
    const filteredUsers = React.useMemo(() => {
        if (!keyword) return users;
        
        const lowerKeyword = keyword.toLowerCase();
        return users.filter(u => 
            u.name.toLowerCase().includes(lowerKeyword) ||
            u.username.toLowerCase().includes(lowerKeyword) ||
            u.email.toLowerCase().includes(lowerKeyword)
        );
    }, [users, keyword]);

    // mo modal edit voi deep copy du lieu user
    function openEditModal(user) {
        setEditingUser({ 
            ...user,
            address: { ...user.address }
        });
    }

    // dong modal va xoa du lieu tam
    function closeEditModal() {
        setEditingUser(null);
    }

    // xu ly thay doi input trong modal edit
    function handleEditChange(fieldName, value) {
        if (['street', 'suite', 'city'].includes(fieldName)) {
            setEditingUser(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [fieldName]: value
                }
            }));
        } else {
            setEditingUser(prev => ({
                ...prev,
                [fieldName]: value
            }));
        }
    }

    // luu thay doi sau khi edit
    function saveUser() {
        if (!editingUser.name || !editingUser.username) {
            alert('Vui lòng điền đầy đủ Name và Username');
            return;
        }

        setUsers(prev => prev.map(u => 
            u.id === editingUser.id ? editingUser : u
        ));
        
        closeEditModal();
    }

    // xoa user khoi danh sach
    function removeUser(id) {
        if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
            setUsers((prev) => prev.filter((u) => u.id !== id));
        }
    }

    if (loading) {
        return (
            <div className="card">
                <h2 className="card-title">📋 Danh sách người dùng</h2>
                <div className="no-results">
                    ⏳ Đang tải dữ liệu...
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <h2 className="card-title">📋 Danh sách người dùng</h2>
            <p className="user-count">
                {filteredUsers.length === users.length 
                    ? `Tổng số: ${users.length} người dùng`
                    : `Tìm thấy: ${filteredUsers.length}/${users.length} người dùng`
                }
            </p>
            
            {filteredUsers.length === 0 ? (
                <div className="no-results">
                    {keyword 
                        ? '🔍 Không tìm thấy kết quả phù hợp'
                        : '📭 Chưa có người dùng nào'
                    }
                </div>
            ) : (
                <div className="result-table-container">
                    <table className="result-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Họ và tên</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Phone</th>
                                <th>Website</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.username}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        {u.address ? (
                                            <div style={{ fontSize: '0.85em' }}>
                                                {u.address.street && <div>{u.address.street}</div>}
                                                {u.address.suite && <div>{u.address.suite}</div>}
                                                {u.address.city && <div><strong>{u.address.city}</strong></div>}
                                                {!u.address.street && !u.address.suite && !u.address.city && '-'}
                                            </div>
                                        ) : '-'}
                                    </td>
                                    <td>{u.phone || '-'}</td>
                                    <td>{u.website || '-'}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button 
                                                onClick={() => openEditModal(u)}
                                                className="btn-edit"
                                            >
                                                Sửa
                                            </button>
                                            <button 
                                                onClick={() => removeUser(u.id)}
                                                className="btn-delete"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* modal edit user */}
            {editingUser && (
                <div className="modal-overlay" onClick={closeEditModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Chỉnh sửa người dùng</h3>
                            <button 
                                className="modal-close" 
                                onClick={closeEditModal}
                                aria-label="Đóng"
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="add-user-form">
                                <div className="form-group">
                                    <label htmlFor="edit-name">Họ và tên *</label>
                                    <input
                                        id="edit-name"
                                        type="text"
                                        value={editingUser.name}
                                        onChange={(e) => handleEditChange("name", e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-username">Tên đăng nhập *</label>
                                    <input
                                        id="edit-username"
                                        type="text"
                                        value={editingUser.username}
                                        onChange={(e) => handleEditChange("username", e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-email">Email</label>
                                    <input
                                        id="edit-email"
                                        type="email"
                                        value={editingUser.email}
                                        onChange={(e) => handleEditChange("email", e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-street">Địa chỉ (Street)</label>
                                    <input
                                        id="edit-street"
                                        type="text"
                                        value={editingUser.address?.street || ''}
                                        onChange={(e) => handleEditChange("street", e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-suite">Căn hộ/Phòng (Suite)</label>
                                    <input
                                        id="edit-suite"
                                        type="text"
                                        value={editingUser.address?.suite || ''}
                                        onChange={(e) => handleEditChange("suite", e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-city">Thành phố (City)</label>
                                    <input
                                        id="edit-city"
                                        type="text"
                                        value={editingUser.address?.city || ''}
                                        onChange={(e) => handleEditChange("city", e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-phone">Số điện thoại</label>
                                    <input
                                        id="edit-phone"
                                        type="text"
                                        value={editingUser.phone || ''}
                                        onChange={(e) => handleEditChange("phone", e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-website">Website</label>
                                    <input
                                        id="edit-website"
                                        type="text"
                                        value={editingUser.website || ''}
                                        onChange={(e) => handleEditChange("website", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button 
                                type="button"
                                className="btn btn-cancel" 
                                onClick={closeEditModal}
                            >
                                Hủy
                            </button>
                            <button 
                                type="button"
                                className="btn btn-primary" 
                                onClick={saveUser}
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
