<?php

namespace App\Controller;

use App\Repository\SolutionRepository;
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
    public function index(): Response
    {
        return $this->render('home/index.html.twig', [
            'solutions' => $this->solutionRepository->findLasts(6),
        ]);
    }
}
