<?php

namespace App\Controller;

use App\Entity\Solution;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SolutionController extends AbstractController
{
    /**
     * @Route("/solution", name="solution")
     */
    public function index(): Response
    {
        return $this->render('solution/index.html.twig', [
            'title' => 'Solutions',
        ]);
    }

    /**
     * @Route("/solution/{id}/detail", name="solution_detail")
     */
    public function details(Solution $solution): Response
    {
        //dd($solution);
        return $this->render('solution/detail.html.twig', [
            'title' => $solution->getTitle(),
            'solution' =>$solution
        ]);
    }
}
