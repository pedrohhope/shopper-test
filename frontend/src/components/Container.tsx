
const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-5xl mx-auto p-5 flex h-screen 2xl:items-center">
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}
export default Container