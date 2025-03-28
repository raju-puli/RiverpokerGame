import Skeleton from "react-loading-skeleton";

const TableSkeleton = () => {
    return (
        <>
            <div className="mainGrid">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div className={`df skeleton-container ${i === 0 ? "skeleton-header-cls" : ""}`} key={i}>
                        <span className="lobby_table_img" style={{ minWidth: "50px", visibility: i === 0 ? "hidden" : "visible" }}>
                            <Skeleton circle width={48} height={34} />
                            <div className="lobby_table_active_seats">
                                <Skeleton circle width={48} height={48} />
                            </div>
                        </span>
                        <div className="df min_width_992" style={{ width: '100%', alignItems: 'center' }}>
                            <div className="df col-12" style={{ margin: '0px 10px' }}>
                                <span className="col-4"><Skeleton width={280}/></span>
                                <span className="col-2"><Skeleton width={80}/></span>
                                <span className="col-2"><Skeleton width={60}/></span>
                                <span className="col-1"><Skeleton width={40}/></span>
                                <span className="col-1"><Skeleton width={50}/></span>
                                <span className="col-1"><Skeleton width={40}/></span>
                                <span className="col-1"><Skeleton width={40}/></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TableSkeleton;
