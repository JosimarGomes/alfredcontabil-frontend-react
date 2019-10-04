import { ContasBancarias } from '../modules/ContasBancarias';
import { Home } from '../modules/Home';
import { Movimentacoes } from '../modules/Movimentacoes';
// import { Services } from '../modules/Services';
import { PlanoDeContas } from '../modules/PlanoDeContas';

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Dashboard',
        icon: 'dashboard',
        isMenu: true,
    },
    {
        path: '/movimentacoes',
        component: Movimentacoes,
        name: 'Movimentações',
        icon: 'dollar',
        isMenu: true,
    },
    // {
    //     path: '/services',
    //     component: Services,
    //     name: "Serviços",
    //     icon: "tags",
    //     isMenu: true
    // },
    {
        path: '/planodecontas',
        component: PlanoDeContas,
        name: 'Plano de contas',
        icon: 'profile',
        isMenu: true,
    },
    {
        path: '/contasbancarias',
        component: ContasBancarias,
        name: 'Contas bancárias',
        icon: 'bank',
        isMenu: true,
    },
];

export default routes;
