// component tim kiem - truyen gia tri tim kiem len App qua callback onChangeValue
function SearchForm({ onChangeValue }) {
    return (
        <div className="card">
            <h2 className="card-title">🔍 Tìm kiếm</h2>
            <div className="search-form">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Nhập tên, username hoặc email để tìm kiếm..."
                    onChange={(e) => onChangeValue(e.target.value)}
                />
            </div>
        </div>
    );
}
