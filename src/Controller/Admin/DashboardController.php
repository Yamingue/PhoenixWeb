<?php

namespace App\Controller\Admin;

use App\Entity\CaseGroupe;
use App\Entity\CaseStudies;
use App\Entity\Solution;
use App\Entity\Team;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    /**
     * @Route("/admin", name="admin")
     */
    public function index(): Response
    {
        return parent::index();
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Phoenixweb');
    }

    public function configureMenuItems(): iterable
    {
       // yield MenuItem::linktoDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud("Solution",'fa fa-handshake',Solution::class);
        yield MenuItem::linkToCrud('Case Groupe','fas fa-layer-group',CaseGroupe::class);
        yield MenuItem::linkToCrud('Case Studies','fas fa-paragraph',CaseStudies::class);
        yield MenuItem::linkToCrud('Team Phoenix','fas fa-users',Team::class);
        // yield MenuItem::linkToCrud('The Label', 'fas fa-list', EntityClass::class);
    }
}
