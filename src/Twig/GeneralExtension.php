<?php

namespace App\Twig;

use App\Repository\CaseGroupeRepository;
use App\Repository\CaseStudiesRepository;
use App\Repository\SolutionRepository;
use App\Repository\TeamRepository;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class GeneralExtension extends AbstractExtension
{
    private $caseGroupeRepository;
    private $caseStudiesRepository;
    private $teamRepository;
    private $solutionRepository;

    public function __construct( 
    CaseGroupeRepository $caseGroupeRepository,
    CaseStudiesRepository $caseStudiesRepository, 
    TeamRepository $teamRepository,
    SolutionRepository $solutionRepository
    )
    {
        $this->caseGroupeRepository = $caseGroupeRepository;
        $this->caseStudiesRepository = $caseStudiesRepository;
        $this->teamRepository = $teamRepository;
        $this->solutionRepository = $solutionRepository;
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
}
