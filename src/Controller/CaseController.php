<?php

namespace App\Controller;

use App\Entity\CaseStudies;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CaseController extends AbstractController
{
    /**
     * @Route("/case", name="case")
     */
    public function index(): Response
    {
        return $this->render('case/index.html.twig', [
            'title' => 'Case Studies'
        ]);
    }

     /**
     * @Route("/case/{id}", name="case_detail")
     */
    public function detail(CaseStudies $case=null): Response
    {
       // dd($case);
        return $this->render('case/detail.html.twig', [
            'title' => $case->getTitle(),
            'case' => $case,
        ]);
    }
}
