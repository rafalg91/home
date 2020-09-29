<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Worker;

class ApiController extends AbstractController
{
    /**
     * @Route("/api/workers", name="workers")
     */
    public function workers()
    {
        $workers = $this->getDoctrine()
            ->getRepository(Worker::class)
            ->findAll();

        return new Response(json_encode($workers));
    }
}
