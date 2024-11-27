"use client";
import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import {
	FaChartBar,
	FaChevronRight,
	FaChartLine,
	FaChartPie,
	FaShield,
	FaUsers,
} from "react-icons/fa6";

import { AiFillThunderbolt } from "react-icons/ai";

export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
				<div className="container mx-auto px-6 py-16 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-4">
						Gerenciamento de projetos para OSCs
					</h1>
					<p className="text-xl md:text-2xl mb-8">
						Visualize, analise e acompanhe os projetos
					</p>
					<div className="flex justify-center space-x-4">
						<Button
							size="lg"
							className="bg-white text-purple-700 hover:bg-gray-100"
							as={Link}
							href="/dashboard"
						>
							Acessar sistema
						</Button>
					</div>
				</div>
			</header>

			{/* Destaques de Recursos */}
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-12">
						Recursos Poderosos ao Seu Alcance
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{
								title: "Dashboards Interativos",
								icon: FaChartBar,
								description:
									"Crie visualizações impressionantes com apenas alguns cliques",
							},
							{
								title: "Colaboração em Tempo Real",
								icon: FaUsers,
								description:
									"Trabalhe em conjunto de forma transparente com sua equipe",
							},
							{
								title: "Análises Avançadas",
								icon: FaChartPie,
								description:
									"Descubra insights ocultos com nossas poderosas ferramentas de análise",
							},
							{
								title: "Relatórios Personalizados",
								icon: FaChartLine,
								description:
									"Gere relatórios profissionais adaptados às suas necessidades",
							},
							{
								title: "Rápido como um Raio",
								icon: AiFillThunderbolt,
								description:
									"Experimente um desempenho extremamente rápido, mesmo com conjuntos de dados grandes",
							},
							{
								title: "Seguro e Confiável",
								icon: FaShield,
								description:
									"Seus dados estão seguros com nossa segurança de nível empresarial",
							},
						].map((feature) => (
							<Card key={feature.title} className="items-center text-center">
								<CardHeader className="flex flex-col">
									<feature.icon className="w-12 h-12 mx-auto text-purple-600" />
									<h1 className="font-bold text-xl">{feature.title}</h1>
								</CardHeader>
								<CardBody className="items-center">
									<p>{feature.description}</p>
								</CardBody>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 bg-purple-700 text-white">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-3xl font-bold mb-8">Experimente agora</h2>
				</div>
				<div className="flex justify-center space-x-4">
					<Button
						size="lg"
						className="bg-white text-purple-700 hover:bg-gray-100"
						as={Link}
						href="/dashboard"
					>
						Acessar sistema
					</Button>
				</div>
			</section>

			{/* Rodapé */}
			<footer className="bg-gray-800 text-white py-8">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="mb-4 md:mb-0">
							<h3 className="text-2xl font-bold">OSC Manager</h3>
							<p>Gerencie projetos para OSCs</p>
						</div>
						<div className="flex space-x-4">
							<a href="/" className="hover:text-purple-400">
								Sobre
							</a>
							<a href="/" className="hover:text-purple-400">
								Recursos
							</a>
							<a href="/" className="hover:text-purple-400">
								Preços
							</a>
							<a href="/" className="hover:text-purple-400">
								Contato
							</a>
						</div>
					</div>
					<div className="mt-8 text-center text-sm">
						© 2024 OSC Manager. Todos os direitos reservados.
					</div>
				</div>
			</footer>
		</div>
	);
}
