import React, { Suspense, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
const InputCustomStyles = React.lazy(() => import('../../Components/InputCustomStyles/InputCustomStyles'));

const Welcome = () => {
    const { props } = usePage();
    const sessionEmail = props.session_email || '';

    useEffect(() => {
        if (sessionEmail) {
            window.location.href = '/menu';
        }
    }, [sessionEmail]);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/create-session');
    };

    return (
        <>
            {!sessionEmail && (
                <div className="flex flex-col min-h-screen w-full relative">
                    <div
                        className="relative flex items-center justify-center h-[600px] bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: 'url("https://source.unsplash.com/1600x900/?restaurant,food")',
                        }}
                    >
                        <div className="absolute inset-0 bg-yellow-900 bg-opacity-50"></div>
                        <div className="relative z-10 text-center flex flex-col items-center px-4">
                            <div className=" bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-lg mx-auto shadow-xl">
                                <Suspense fallback={<div>Carregando...</div>}>
                                    <img
                                        alt="Sua Empresa"
                                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=red&shade=600"
                                        className="h-16 w-auto mb-4 drop-shadow-lg mx-auto"
                                        loading="lazy"
                                    />
                                </Suspense>
                                <h1 className="text-white font-extrabold text-3xl sm:text-5xl mb-4 drop-shadow-lg">
                                    Bem-vindo ao Cardápio Online!
                                </h1>
                                <p className="text-white text-base sm:text-lg mb-6 drop-shadow-lg">
                                    Escolha seus pratos favoritos, gere sua comanda e viva uma experiência gastronômica inesquecível!
                                </p>
                                <a
                                    href="#cadastro"
                                    className="mt-2 inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
                                >
                                    Acessar Cardápio
                                </a>
                            </div>
                        </div>
                    </div>

                    <section className="bg-white py-12 px-4">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                                Por que usar nosso Cardápio Online?
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                {/* Card 1 */}
                                <div className="flex flex-col items-center text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-12 h-12 text-red-600 mb-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>
                                    <h3 className="font-bold text-lg mb-2">Praticidade</h3>
                                    <p className="text-gray-600">
                                        Navegue e escolha seus pratos preferidos de forma rápida e intuitiva.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-12 h-12 text-red-600 mb-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.098 19.014l1.42-4.014a1 1 0 011.271-.629l.19.07a7.5 7.5 0 00.638-2.285m2.62 6.688L8.818 9.592a2.25 2.25 0 013.033-2.68l5.2 1.93M11 2.25A7.5 7.5 0 0118.75 10H21"
                                        />
                                    </svg>
                                    <h3 className="font-bold text-lg mb-2">Inovação</h3>
                                    <p className="text-gray-600">
                                        Tenha um sistema moderno que facilita sua experiência gastronômica.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-12 h-12 text-red-600 mb-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223c.404-.764 1.45-.764 1.855 0l1.059 1.999a2.25 2.25 0 001.907 1.191l2.342.02c.855.007 1.665.55 1.995 1.358l.908 2.099c.405.933 1.765.933 2.17 0l.909-2.1a2.25 2.25 0 011.994-1.357l2.342-.02a2.25 2.25 0 001.907-1.19l1.06-2a1.125 1.125 0 00-1.102-1.632H5.082a1.125 1.125 0 00-.102.001z"
                                        />
                                    </svg>
                                    <h3 className="font-bold text-lg mb-2">Agilidade</h3>
                                    <p className="text-gray-600">
                                        Visualize o cardápio e monte seu pedido em apenas alguns cliques.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gray-50 py-12 px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                Depoimento de quem já usou
                            </h2>
                            <p className="text-gray-700 mb-6">
                                “Fiquei impressionado com a facilidade de montar minha comanda e a agilidade no atendimento. Recomendo demais!”
                            </p>
                            <div className="flex justify-center items-center mb-2">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="none"
                                        className="w-6 h-6 text-yellow-400"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.48 3.499a.75.75 0 011.04 0l2.4 2.393 3.314.482a.75.75 0 01.416 1.278l-2.4 2.337.567 3.304a.75.75 0 01-1.088.79L12 12.347l-2.969 1.56a.75.75 0 01-1.088-.79l.567-3.305-2.4-2.336a.75.75 0 01.416-1.278l3.314-.482 2.4-2.393z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-500">— João Silva</p>
                        </div>
                    </section>

                    <section id="cadastro" className="bg-white py-12 px-4">
                        <div className="max-w-xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                                Acesse Agora o Cardápio
                            </h2>
                            <p className="text-center text-gray-700 mb-8">
                                Digite seu e-mail para gerar sua comanda e começar a experiência!
                            </p>

                            <div className="bg-white shadow-xl rounded-lg p-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-bold text-gray-700 mb-1"
                                        >
                                            Seu E-mail:
                                        </label>
                                        {/* <InputCustomStyles
                                            type="email"
                                            placeholder="exemplo@dominio.com"
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        /> */}
                                        <Suspense fallback={<div>Carregando...</div>}>
                                            <InputCustomStyles
                                                type="email"
                                                placeholder="exemplo@dominio.com"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                        </Suspense>
                                        {errors.email && (
                                            <div className="text-red-600 text-sm mt-1">
                                                {errors.email}
                                            </div>
                                        )}
                                        {errors.mesa && (
                                            <div className="text-red-600 text-sm mt-2">
                                                {errors.mesa}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                                    >
                                        {processing ? 'Carregando...' : 'Entrar no Cardápio'}
                                    </button>

                                </form>
                            </div>
                        </div>
                    </section>

                    <footer className="bg-gray-900 text-gray-200 py-6 px-4 mt-auto">
                        <div className="max-w-7xl mx-auto flex flex-col items-center sm:flex-row sm:justify-between">
                            <p className="mb-4 sm:mb-0">
                                © {new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.
                            </p>
                            <div className="flex space-x-4">
                                {/* Ícones de redes sociais (exemplo) */}
                                <a
                                    href="#"
                                    className="hover:text-white"
                                    aria-label="Instagram"
                                >
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 512 512"
                                        className="w-6 h-6"
                                    >
                                        <path d="M349.33 69.33H162.67A93.34 93.34 0 0069.33 162.67v186.66a93.34 93.34 0 0093.34 93.34h186.66a93.34 93.34 0 0093.34-93.34V162.67a93.34 93.34 0 00-93.34-93.34zm64 280a64.07 64.07 0 01-64 64H162.67a64.07 64.07 0 01-64-64V162.67a64.07 64.07 0 0164-64h186.66a64.07 64.07 0 0164 64zm-64-186.67a16 16 0 1116 16 16 16 0 01-16-16zm-32 80a80 80 0 11-80-80 80 80 0 0180 80z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white"
                                    aria-label="Facebook"
                                >
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 512 512"
                                        className="w-6 h-6"
                                    >
                                        <path d="M426.666 0H85.333C38.293 0 0 38.293 0 85.333v341.334C0 473.707 38.293 512 85.333 512h341.334C473.707 512 512 473.707 512 426.667V85.333C512 38.293 473.707 0 426.666 0zM394.667 149.333h-32c-25.6 0-32 12.8-32 32v42.667h64l-8.533 64H330.67v192h-64V288h-42.667v-64h42.666v-42.667c0-51.2 25.6-81.066 81.067-81.066h42.666v49.066z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white"
                                    aria-label="Twitter"
                                >
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 512 512"
                                        className="w-6 h-6"
                                    >
                                        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 139.508-106.278 300.558-300.558 300.558-59.767 0-115.363-17.219-162.09-47.106 8.447.974 16.568 1.299 25.34.65 49.055-5.199 90.107-29.193 124.138-67.196-46.132-.975-84.792-31.188-98.169-72.772a105.325 105.325 0 0019.561 1.624c13.54 0 26.734-1.624 39.279-4.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c14.182 7.885 30.214 12.64 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.534 5.199-37.36 14.294-52.954C130.728 110.35 223.466 164.903 325.342 170.172c-1.624-7.885-2.599-15.77-2.599-23.979 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.506 12.64 76.67 33.137 23.979-4.548 46.456-13.319 66.599-25.34-7.885 24.632-24.632 45.357-46.456 58.265 21.348-2.273 41.83-8.122 60.669-16.243-14.292 20.791-32.161 39.279-52.628 54.253z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
};

export default Welcome;
