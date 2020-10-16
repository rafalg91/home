<?php

namespace App\Entity;

use App\Repository\LogRepository;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Entity(repositoryClass=LogRepository::class)
 */
class Log implements JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Worker::class, inversedBy="Logs")
     * @ORM\JoinColumn(nullable=false)
     */
    private $worker;

    /**
     * @ORM\ManyToOne(targetEntity=Access::class, inversedBy="log")
     * @ORM\JoinColumn(nullable=false)
     */
    private $access;

    /**
     * @ORM\Column(type="boolean")
     */
    private $status;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    public function jsonSerialize()
    {
        return array(
            'id' => $this->id,
            'status' => $this->status,
            'date' => $this->date->format('Y-m-d'),
            'worker' => array(
                'id' => $this->getWorker()->getId(),
                'name' => $this->getWorker()->getFullname(),
            ),
            'access' => array(
                'id' => $this->getAccess()->getId(),
                'name' => $this->getAccess()->getName(),
            )
        );
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getWorker(): ?Worker
    {
        return $this->worker;
    }

    public function setWorker(?Worker $worker): self
    {
        $this->worker = $worker;

        return $this;
    }

    public function getAccess(): ?Access
    {
        return $this->access;
    }

    public function setAccess(?Access $access): self
    {
        $this->access = $access;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }
}
