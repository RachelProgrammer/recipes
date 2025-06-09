import { observer } from "mobx-react-lite";
import { useStore } from "../store/storeContext";
import { useLang } from "../resources/langContext";
import { Link } from "react-router-dom";

export const HomePage: React.FC = observer(() => {
    const store = useStore();
    const user = store.auth.user;
    const { r } = useLang();

    const brand = "מתכוניה";

    return (
        <main className="p-6 max-w-4xl mx-auto text-right">
            <section className="mb-12">
                <h1 className="text-4xl font-bold text-red-500 mb-4">
                    {r.homepage.welcome_title.replace("{{brand}}", brand)}
                </h1>
                <p className="text-lg text-gray-800">{r.homepage.welcome_text_1}</p>
                <p className="text-lg text-gray-800 mt-3">{r.homepage.welcome_text_2}</p>
                <p className="text-lg text-gray-800 mt-3">{r.homepage.welcome_text_3}</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-red-500 mb-3">{r.homepage.what_to_expect}</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {r.homepage.features.map((line: string, i: number) => (
                        <li key={i}>{line}</li>
                    ))}
                </ul>
            </section>

            {!user && (
                <section className="text-center">
                    <h2 className="text-xl font-medium text-black mb-4">{r.homepage.quick_join_title}</h2>
                    <p className="text-gray-700 mb-6">{r.homepage.quick_join_text}</p>
                    <div className="space-x-2 rtl:space-x-reverse">
                        <Link to="/signup" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl shadow">
                            {r.homepage.signup}
                        </Link>
                        <Link to="/signin" className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-6 rounded-xl shadow" >
                            {r.homepage.signin}
                        </Link>
                    </div>
                </section>
            )}
        </main>
    );
});
