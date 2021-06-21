<?php

namespace App\Controller\Admin;

use App\Entity\CaseGroupe;
use App\Entity\CaseStudies;
use App\Entity\Contact;
use App\Entity\Post;
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
        // redirect to some CRUD controller
        //$routeBuilder = $this->get(AdminUrlGenerator::class);

       // return $this->redirect($routeBuilder->setController(OneOfYourCrudController::class)->generateUrl());

        // you can also redirect to different pages depending on the current user
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // you can also render some template to display a proper Dashboard
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        return $this->render('dashboard.html.twig');
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
        yield MenuItem::linkToCrud('Message','fas fa-inbox',Contact::class);
        yield MenuItem::linkToCrud('Team Phoenix','fas fa-users',Team::class);
        yield MenuItem::linkToCrud('Posts', ' fas fa-newspaper', Post::class);
        // yield MenuItem::linkToCrud('The Label', 'fas fa-list', EntityClass::class);
    }
}
