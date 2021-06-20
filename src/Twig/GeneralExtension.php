<?php

namespace App\Twig;

use Twig\TwigFilter;
use Twig\TwigFunction;
use App\Repository\PostRepository;
use App\Repository\TeamRepository;
use Twig\Extension\AbstractExtension;
use App\Repository\SolutionRepository;
use App\Repository\CaseGroupeRepository;
use App\Repository\CaseStudiesRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;

class GeneralExtension extends AbstractExtension
{
    private $caseGroupeRepository;
    private $caseStudiesRepository;
    private $teamRepository;
    private $solutionRepository;
    private $postRepository;
    private $paginator;

    public function __construct( 
    CaseGroupeRepository $caseGroupeRepository,
    CaseStudiesRepository $caseStudiesRepository, 
    TeamRepository $teamRepository,
    SolutionRepository $solutionRepository,
    PostRepository $postRepository,
    PaginatorInterface $paginator
    )
    {
        $this->caseGroupeRepository = $caseGroupeRepository;
        $this->caseStudiesRepository = $caseStudiesRepository;
        $this->teamRepository = $teamRepository;
        $this->solutionRepository = $solutionRepository;
        $this->postRepository = $postRepository;
        $this->paginator = $paginator;
    }
    public function getFilters(): array
    {
        return [
            // If your filter generates SAFE HTML, you should add a third
            // parameter: ['is_safe' => ['html']]
            // Reference: https://twig.symfony.com/doc/2.x/advanced.html#automatic-escaping
            new TwigFilter('caseGroupes', [$this, 'caseGroupes']),
            new TwigFilter('cases', [$this, 'cases']),
            new TwigFilter('allTeam', [$this, 'allTeam']),

        ];
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('caseGroupes', [$this, 'caseGroupes']),
            new TwigFunction('cases', [$this, 'cases']),
            new TwigFunction('allTeam', [$this, 'allTeam']),
            new TwigFunction('solutions', [$this, 'solutions']),
            new TwigFunction('posts', [$this, 'posts']),


        ];
    }

    public function caseGroupes()
    {
        return $this->caseGroupeRepository->findAll();
    }
    public function cases()
    {
        return $this->caseStudiesRepository->findAll();
    }
    public function allTeam()
    {
        return $this->teamRepository->findAll();
    }
    public function solutions()
    {
        return $this->solutionRepository->findAll();
    }
    public function posts(Request $request)
    {
        return $this->paginator->paginate(
            $this->postRepository->findAllQuery(), /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/
            6 /*limit per page*/
        );
        
    }
}
