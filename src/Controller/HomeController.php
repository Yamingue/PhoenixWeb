<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Form\ContactType;
use App\Repository\SolutionRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    private $solutionRepository;
    public function __construct( SolutionRepository $solutionRepository )
    {
      $this->solutionRepository = $solutionRepository;  
    }
    /**
     * @Route("/", name="home")
     */
    public function index(Request $request): Response
    {
        $contact = new Contact();
        $form = $this->createForm(ContactType::class,$contact);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($contact);
            $em->flush();
            $this->addFlash('success','Message envoyer');
            return $this->redirectToRoute('home');
        }
        return $this->render('home/index.html.twig', [
            'solutions' => $this->solutionRepository->findLasts(6),
            'title' => 'Home',
            'contact' => $form->createView()
        ]);
    }
}
