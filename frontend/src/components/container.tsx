
const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-[1000px] mx-auto p-5 flex items-center h-screen">
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}
export default Container