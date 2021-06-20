<?php

namespace App\Controller;

use App\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
    /**
     * @Route("/blog", name="blog")
     */
    public function index(): Response
    {
        return $this->render('blog/index.html.twig', [
            'title' => 'Blog',
        ]);
    }
    
    /**
     * @Route("/blog/{id}/detail", name="blog_detail")
     */
    public function detail(Post $post): Response
    {
        return $this->render('blog/detail.html.twig', [
            'title' => 'Blog',
            'post'=>$post
        ]);
    }
}
